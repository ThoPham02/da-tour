package logic

import (
	"context"

	"da-tour/api/internal/svc"
	"da-tour/api/internal/types"
	"da-tour/common"
	"da-tour/model"

	"github.com/zeromicro/go-zero/core/logx"
)

type FilterPaymentLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewFilterPaymentLogic(ctx context.Context, svcCtx *svc.ServiceContext) *FilterPaymentLogic {
	return &FilterPaymentLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *FilterPaymentLogic) FilterPayment(req *types.FilterPaymentReq) (resp *types.FilterPaymentRes, err error) {
	var total int64
	var paymentsModel []*model.PaymentTbl

	total, err = l.svcCtx.PaymentTblModel.CountPayment(l.ctx, req.UserID, req.Status, req.OrderID)
	if err != nil {
		l.Logger.Error(err)
		return &types.FilterPaymentRes{
			Result: types.Result{
				Code:    common.DB_ERR_CODE,
				Message: common.DB_ERR_MESS,
			},
		}, nil
	}

	paymentsModel, err = l.svcCtx.PaymentTblModel.FilterPayment(l.ctx, req.UserID, req.Status, req.OrderID, req.Limit, req.Offset)
	if err != nil {
		l.Logger.Error(err)
		return &types.FilterPaymentRes{
			Result: types.Result{
				Code:    common.DB_ERR_CODE,
				Message: common.DB_ERR_MESS,
			},
		}, nil
	}

	for _, payment := range paymentsModel {
		orderModel, err := l.svcCtx.OrderTblModel.FindOne(l.ctx, payment.OrderId.Int64)
		if err != nil {
			l.Logger.Error(err)
			return &types.FilterPaymentRes{
				Result: types.Result{
					Code:    common.DB_ERR_CODE,
					Message: common.DB_ERR_MESS,
				},
			}, nil
		}

		resp.Payments = append(resp.Payments, types.Payment{
			ID:          payment.Id,
			OrderID:     payment.OrderId.Int64,
			OrderCode:   orderModel.Code,
			Method:      payment.Method,
			PaymentDate: payment.PaymentDate.Int64,
			Amount:      payment.Amount,
			Status:      payment.Status,
			Url:         payment.Url.String,
		})
	}

	return &types.FilterPaymentRes{
		Result: types.Result{
			Code:    common.SUCCESS_CODE,
			Message: common.SUCCESS_MESS,
		},
		Total:    total,
		Payments: resp.Payments,
	}, nil
}
