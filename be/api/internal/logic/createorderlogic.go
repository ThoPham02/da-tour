package logic

import (
	"context"
	"database/sql"

	"da-tour/api/internal/svc"
	"da-tour/api/internal/types"
	"da-tour/api/internal/utils"
	"da-tour/common"
	"da-tour/model"

	"github.com/zeromicro/go-zero/core/logx"
)

type CreateOrderLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewCreateOrderLogic(ctx context.Context, svcCtx *svc.ServiceContext) *CreateOrderLogic {
	return &CreateOrderLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *CreateOrderLogic) CreateOrder(req *types.CreateOrderReq) (resp *types.CreateOrderRes, err error) {
	l.Logger.Info("CreateOrderLogic", req)

	var userID int64
	var orderID int64 = utils.GetID()
	var currentTime int64 = utils.GetTimeNow()
	var orderStatus int64 = common.ORDER_STATUS_PENDING
	var paymentStatus int64 = common.PAYMENT_STATUS_PENDING
	var orderCode string
	var total int64

	var userModel *model.UserTbl
	var tourModel *model.TourTbl

	userID, err = utils.GetUserIDFromContext(l.ctx)
	if err != nil {
		l.Logger.Error(err)
		return &types.CreateOrderRes{
			Result: types.Result{
				Code:    common.UNKNOWN_ERR_CODE,
				Message: common.UNKNOWN_ERR_MESS,
			},
		}, nil
	}

	userModel, err = l.svcCtx.UserTblModel.FindOne(l.ctx, userID)
	if err != nil || userModel == nil {
		l.Logger.Error(err)
		return &types.CreateOrderRes{
			Result: types.Result{
				Code:    common.UNKNOWN_ERR_CODE,
				Message: common.UNKNOWN_ERR_MESS,
			},
		}, nil
	}

	if userModel.Role == common.USER_ROLE_ADMIN {
		orderStatus = common.ORDER_STATUS_CONFIRMED
	}

	tourModel, err = l.svcCtx.TourTblModel.FindOne(l.ctx, req.TourID)
	if err != nil || tourModel == nil {
		l.Logger.Error(err)
		return &types.CreateOrderRes{
			Result: types.Result{
				Code:    common.NOT_FOUND_CODE,
				Message: common.NOT_FOUND_MESS,
			},
		}, nil
	}

	if tourModel.Status != common.TOUR_STATUS_ACTIVE {
		return &types.CreateOrderRes{
			Result: types.Result{
				Code:    common.INVALID_REQUEST_CODE,
				Message: common.INVALID_REQUEST_MESS,
			},
		}, nil
	}

	if tourModel.Remain < req.Seats {
		return &types.CreateOrderRes{
			Result: types.Result{
				Code:    common.TOUR_NOT_ENOUGH_CODE,
				Message: common.TOUR_NOT_ENOUGH_MESS,
			},
		}, nil
	}

	total, err = l.svcCtx.OrderTblModel.Count(l.ctx)
	if err != nil {
		l.Logger.Error(err)
		return &types.CreateOrderRes{
			Result: types.Result{
				Code:    common.DB_ERR_CODE,
				Message: common.DB_ERR_MESS,
			},
		}, nil
	}
	orderCode = "DA" + string(total+1)

	tourModel.Remain = tourModel.Remain - req.Seats
	if tourModel.Remain == 0 {
		tourModel.Status = common.TOUR_STATUS_SOLD_OUT
	}
	err = l.svcCtx.TourTblModel.Update(l.ctx, tourModel)
	if err != nil {
		l.Logger.Error(err)
		return &types.CreateOrderRes{
			Result: types.Result{
				Code:    common.DB_ERR_CODE,
				Message: common.DB_ERR_MESS,
			},
		}, nil
	}
	_, err = l.svcCtx.OrderTblModel.Insert(l.ctx, &model.OrderTbl{
		Id:            orderID,
		UserId:        sql.NullInt64{Valid: true, Int64: userID},
		UserName:      req.Fullname,
		Phone:         req.Phone,
		Email:         req.Email,
		TourId:        req.TourID,
		Code:          orderCode,
		Quantity:      req.Seats,
		Status:        orderStatus,
		PaymentStatus: paymentStatus,
		CreatedAt:     sql.NullInt64{Valid: true, Int64: currentTime},
		UpdatedAt:     sql.NullInt64{Valid: true, Int64: currentTime},
	})
	if err != nil {
		l.Logger.Error(err)
		return &types.CreateOrderRes{
			Result: types.Result{
				Code:    common.DB_ERR_CODE,
				Message: common.DB_ERR_MESS,
			},
		}, nil
	}

	l.Logger.Info("CreateOrderLogic Success")
	return &types.CreateOrderRes{
		Result: types.Result{
			Code:    common.SUCCESS_CODE,
			Message: common.SUCCESS_MESS,
		},
	}, nil
}
