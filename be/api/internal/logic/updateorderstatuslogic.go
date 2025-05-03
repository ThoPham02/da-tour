package logic

import (
	"context"

	"da-tour/api/internal/svc"
	"da-tour/api/internal/types"
	"da-tour/common"
	"da-tour/model"

	"github.com/zeromicro/go-zero/core/logx"
)

type UpdateOrderStatusLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewUpdateOrderStatusLogic(ctx context.Context, svcCtx *svc.ServiceContext) *UpdateOrderStatusLogic {
	return &UpdateOrderStatusLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *UpdateOrderStatusLogic) UpdateOrderStatus(req *types.UpdateOrderStatusReq) (resp *types.UpdateOrderStatusRes, err error) {
	l.Logger.Info("UpdateOrderStatus ", req)

	var orderModel *model.OrderTbl
	orderModel, err = l.svcCtx.OrderTblModel.FindOne(l.ctx, req.OrderID)
	if err != nil || orderModel == nil {
		l.Logger.Error(err)
		return &types.UpdateOrderStatusRes{
			Result: types.Result{
				Code:    common.DB_ERR_CODE,
				Message: common.DB_ERR_MESS,
			},
		}, nil
	}
	if orderModel.Status != common.ORDER_STATUS_PENDING {
		l.Logger.Error("Order status is not pending")
		return &types.UpdateOrderStatusRes{
			Result: types.Result{
				Code:    common.ORDER_STATUS_ERR_CODE,
				Message: common.ORDER_STATUS_ERR_MESS,
			},
		}, nil
	}

	orderModel.Status = req.Status
	err = l.svcCtx.OrderTblModel.Update(l.ctx, orderModel)
	if err != nil {
		l.Logger.Error(err)
		return &types.UpdateOrderStatusRes{

			Result: types.Result{
				Code:    common.DB_ERR_CODE,
				Message: common.DB_ERR_MESS,
			},
		}, nil
	}
	return &types.UpdateOrderStatusRes{
		Result: types.Result{
			Code:    common.SUCCESS_CODE,
			Message: common.SUCCESS_MESS,
		},
	}, nil
}
