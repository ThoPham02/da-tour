package logic

import (
	"context"

	"da-tour/api/internal/svc"
	"da-tour/api/internal/types"
	"da-tour/common"
	"da-tour/model"

	"github.com/zeromicro/go-zero/core/logx"
)

type GetOrderLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewGetOrderLogic(ctx context.Context, svcCtx *svc.ServiceContext) *GetOrderLogic {
	return &GetOrderLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *GetOrderLogic) GetOrder(req *types.GetOrderReq) (resp *types.GetOrderRes, err error) {
	l.Logger.Info("GetOrder ", req)

	var orderModel *model.OrderTbl
	var payments []types.Payment
	var paid float64

	orderModel, err = l.svcCtx.OrderTblModel.FindOne(l.ctx, req.OrderID)
	if err != nil || orderModel == nil {
		l.Logger.Error(err)
		return &types.GetOrderRes{
			Result: types.Result{
				Code:    common.DB_ERR_CODE,
				Message: common.DB_ERR_MESS,
			},
		}, nil
	}

	var tourModel *model.TourTbl
	tourModel, err = l.svcCtx.TourTblModel.FindOne(l.ctx, orderModel.TourId)
	if err != nil || tourModel == nil {
		l.Logger.Error(err)
		return &types.GetOrderRes{
			Result: types.Result{
				Code:    common.DB_ERR_CODE,
				Message: common.DB_ERR_MESS,
			},
		}, nil
	}

	var paymentsModel []*model.PaymentTbl
	paymentsModel, err = l.svcCtx.PaymentTblModel.GetByOrderID(l.ctx, orderModel.Id)
	if err != nil {
		l.Logger.Error(err)
		return &types.GetOrderRes{
			Result: types.Result{
				Code:    common.DB_ERR_CODE,
				Message: common.DB_ERR_MESS,
			},
		}, nil
	}
	for _, payment := range paymentsModel {
		payments = append(payments, types.Payment{
			ID:          payment.Id,
			OrderID:     payment.OrderId.Int64,
			OrderCode:   "",
			Method:      payment.Method,
			PaymentDate: payment.PaymentDate.Int64,
			Amount:      payment.Amount,
			Status:      payment.Status,
			Url:         payment.Url.String,
		})

		if payment.Status == common.PAYMENT_STATUS_COMPLETED {
			paid += payment.Amount
		}
	}

	l.Logger.Info("GetOrder Success")
	return &types.GetOrderRes{
		Result: types.Result{
			Code:    common.SUCCESS_CODE,
			Message: common.SUCCESS_MESS,
		},
		Order: types.Order{
			ID:            orderModel.Id,
			Code:          orderModel.Code,
			TourID:        orderModel.TourId,
			TourName:      "",
			UserID:        orderModel.UserId.Int64,
			FullName:      orderModel.UserName,
			Email:         orderModel.Email,
			Phone:         orderModel.Phone,
			Status:        orderModel.Status,
			Quantity:      orderModel.Quantity,
			TotalPrice:    orderModel.Total,
			Paid:          paid,
			PaymentStatus: orderModel.PaymentStatus,
			CreateDate:    orderModel.CreatedAt.Int64,
		},
		Tour: types.Tour{
			ID:            tourModel.Id,
			Name:          tourModel.Name,
			Image:         tourModel.Image,
			Description:   tourModel.Description.String,
			Duration:      tourModel.Duration,
			Location:      tourModel.Location,
			Overview:      tourModel.Overview.String,
			Price:         tourModel.Price,
			DepartureDate: tourModel.DepartureDate.Int64,
			Quantity:      tourModel.Quantity,
			Remain:        tourModel.Remain,
			Status:        tourModel.Status,
		},
		Payments: payments,
	}, nil

}
