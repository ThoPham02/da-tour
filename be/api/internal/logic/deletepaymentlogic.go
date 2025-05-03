package logic

import (
	"context"

	"da-tour/api/internal/svc"
	"da-tour/api/internal/types"
	"da-tour/common"
	"da-tour/model"

	"github.com/zeromicro/go-zero/core/logx"
)

type DeletePaymentLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewDeletePaymentLogic(ctx context.Context, svcCtx *svc.ServiceContext) *DeletePaymentLogic {
	return &DeletePaymentLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *DeletePaymentLogic) DeletePayment(req *types.DeletePaymentReq) (resp *types.DeletePaymentRes, err error) {
	l.Logger.Info("DeletePaymentLogic: ", req)

	var paymentsModel []*model.PaymentTbl
	var paymentModel *model.PaymentTbl
	var orderModel *model.OrderTbl
	var totalPayment float64

	paymentModel, err = l.svcCtx.PaymentTblModel.FindOne(l.ctx, req.PaymentID)
	if err != nil {
		l.Logger.Error(err)
		return &types.DeletePaymentRes{
			Result: types.Result{
				Code:    common.DB_ERR_CODE,
				Message: common.DB_ERR_MESS,
			},
		}, err
	}

	orderModel, err = l.svcCtx.OrderTblModel.FindOne(l.ctx, paymentModel.OrderId.Int64)
	if err != nil {
		l.Logger.Error(err)
		return &types.DeletePaymentRes{
			Result: types.Result{
				Code:    common.DB_ERR_CODE,
				Message: common.DB_ERR_MESS,
			},
		}, err
	}

	err = l.svcCtx.PaymentTblModel.Delete(l.ctx, req.PaymentID)
	if err != nil {
		l.Logger.Error(err)
		return &types.DeletePaymentRes{
			Result: types.Result{
				Code:    common.DB_ERR_CODE,
				Message: common.DB_ERR_MESS,
			},
		}, err
	}

	paymentsModel, err = l.svcCtx.PaymentTblModel.GetByOrderID(l.ctx, paymentModel.OrderId.Int64)
	if err != nil {
		l.Logger.Error(err)
		return &types.DeletePaymentRes{
			Result: types.Result{
				Code:    common.DB_ERR_CODE,
				Message: common.DB_ERR_MESS,
			},
		}, nil
	}
	for _, payment := range paymentsModel {
		if payment.Status == common.PAYMENT_STATUS_COMPLETED {
			totalPayment += payment.Amount
		}
	}

	if totalPayment < orderModel.Total {
		orderModel.Status = common.ORDER_STATUS_CONFIRMED

		err = l.svcCtx.OrderTblModel.Update(l.ctx, orderModel)
		if err != nil {
			l.Logger.Error(err)
			return &types.DeletePaymentRes{
				Result: types.Result{
					Code:    common.DB_ERR_CODE,
					Message: common.DB_ERR_MESS,
				},
			}, nil
		}
	}

	l.Logger.Info("DeletePaymentLogic Success")
	return &types.DeletePaymentRes{
		Result: types.Result{
			Code:    common.SUCCESS_CODE,
			Message: common.SUCCESS_MESS,
		},
	}, nil
}
