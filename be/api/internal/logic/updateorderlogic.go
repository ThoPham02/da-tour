package logic

import (
	"context"

	"da-tour/api/internal/svc"
	"da-tour/api/internal/types"
	"da-tour/common"
	"da-tour/model"

	"github.com/zeromicro/go-zero/core/logx"
)

type UpdateOrderLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewUpdateOrderLogic(ctx context.Context, svcCtx *svc.ServiceContext) *UpdateOrderLogic {
	return &UpdateOrderLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *UpdateOrderLogic) UpdateOrder(req *types.UpdateOrderReq) (resp *types.UpdateOrderRes, err error) {
	l.Logger.Info("UpdateOrder ", req)

	var orderModel *model.OrderTbl
	var newTourModel *model.TourTbl

	orderModel, err = l.svcCtx.OrderTblModel.FindOne(l.ctx, req.OrderID)
	if err != nil || orderModel == nil {
		l.Logger.Error(err)
		return &types.UpdateOrderRes{
			Result: types.Result{
				Code:    common.DB_ERR_CODE,
				Message: common.DB_ERR_MESS,
			},
		}, nil
	}
	if orderModel.Status != common.ORDER_STATUS_PENDING || orderModel.Status != common.ORDER_STATUS_CONFIRMED {
		l.Logger.Error("Order status is not pending or confirmed")
		return &types.UpdateOrderRes{
			Result: types.Result{
				Code:    common.ORDER_STATUS_ERR_CODE,
				Message: common.ORDER_STATUS_ERR_MESS,
			},
		}, nil
	}

	newTourModel, err = l.svcCtx.TourTblModel.FindOne(l.ctx, req.TourID)
	if err != nil || newTourModel == nil {
		l.Logger.Error(err)
		return &types.UpdateOrderRes{
			Result: types.Result{
				Code:    common.DB_ERR_CODE,
				Message: common.DB_ERR_MESS,
			},
		}, nil
	}
	if newTourModel.Remain < req.Seats {
		l.Logger.Error("Not enough seats available")
		return &types.UpdateOrderRes{
			Result: types.Result{
				Code:    common.TOUR_NOT_ENOUGH_CODE,
				Message: common.TOUR_NOT_ENOUGH_MESS,
			},
		}, nil
	}

	oldTourModel, err := l.svcCtx.TourTblModel.FindOne(l.ctx, orderModel.TourId)
	if err != nil || oldTourModel == nil {
		l.Logger.Error(err)
		return &types.UpdateOrderRes{
			Result: types.Result{
				Code:    common.DB_ERR_CODE,
				Message: common.DB_ERR_MESS,
			},
		}, nil
	}

	oldTourModel.Remain += orderModel.Quantity
	if oldTourModel.Remain == 0 {
		oldTourModel.Status = common.TOUR_STATUS_SOLD_OUT
	} else {
		oldTourModel.Status = common.TOUR_STATUS_ACTIVE
	}
	err = l.svcCtx.TourTblModel.Update(l.ctx, oldTourModel)
	if err != nil {
		l.Logger.Error(err)
		return &types.UpdateOrderRes{
			Result: types.Result{
				Code:    common.DB_ERR_CODE,
				Message: common.DB_ERR_MESS,
			},
		}, nil
	}

	// Update tour remain seats
	newTourModel.Remain -= req.Seats
	if newTourModel.Remain == 0 {
		newTourModel.Status = common.TOUR_STATUS_SOLD_OUT
	} else {
		newTourModel.Status = common.TOUR_STATUS_ACTIVE
	}
	err = l.svcCtx.TourTblModel.Update(l.ctx, newTourModel)
	if err != nil {
		l.Logger.Error(err)
		return &types.UpdateOrderRes{
			Result: types.Result{
				Code:    common.DB_ERR_CODE,
				Message: common.DB_ERR_MESS,
			},
		}, nil
	}

	orderModel.TourId = req.TourID
	orderModel.UserName = req.Fullname
	orderModel.Email = req.Email
	orderModel.Phone = req.Phone
	orderModel.Quantity = req.Seats
	err = l.svcCtx.OrderTblModel.Update(l.ctx, orderModel)
	if err != nil {
		l.Logger.Error(err)
		return &types.UpdateOrderRes{
			Result: types.Result{
				Code:    common.DB_ERR_CODE,
				Message: common.DB_ERR_MESS,
			},
		}, nil
	}

	l.Logger.Info("UpdateOrder Success")
	return &types.UpdateOrderRes{
		Result: types.Result{
			Code:    common.SUCCESS_CODE,
			Message: common.SUCCESS_MESS,
		},
	}, nil
}
