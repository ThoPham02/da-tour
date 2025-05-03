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

type CreatePaymentLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewCreatePaymentLogic(ctx context.Context, svcCtx *svc.ServiceContext) *CreatePaymentLogic {
	return &CreatePaymentLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *CreatePaymentLogic) CreatePayment(req *types.CreatePaymentReq) (resp *types.CreatePaymentRes, err error) {
	l.Logger.Info("CreatePaymentLogic Req:", req)

	var orderModel *model.OrderTbl
	var paymentsModel []*model.PaymentTbl

	var paymentID int64 = utils.GetID()
	var currentTime int64 = utils.GetTimeNow()
	var paymentCode string
	var totalPayment float64

	orderModel, err = l.svcCtx.OrderTblModel.FindOne(l.ctx, req.OrderID)
	if err != nil || orderModel == nil {
		l.Logger.Error(err)
		return &types.CreatePaymentRes{
			Result: types.Result{
				Code:    common.DB_ERR_CODE,
				Message: common.DB_ERR_MESS,
			},
		}, nil
	}

	_, err = l.svcCtx.PaymentTblModel.Insert(l.ctx, &model.PaymentTbl{
		Id:          paymentID,
		OrderId:     sql.NullInt64{Valid: true, Int64: req.OrderID},
		Code:        paymentCode,
		Method:      req.Method,
		PaymentDate: sql.NullInt64{Valid: true, Int64: req.PaymentDate},
		Amount:      req.Amount,
		Url:         sql.NullString{Valid: true, String: req.Url},
		Status:      common.PAYMENT_STATUS_COMPLETED,
		CreatedAt:   sql.NullInt64{Valid: true, Int64: currentTime},
		UpdatedAt:   sql.NullInt64{Valid: true, Int64: currentTime},
	})
	if err != nil {
		l.Logger.Error(err)
		return &types.CreatePaymentRes{
			Result: types.Result{
				Code:    common.DB_ERR_CODE,
				Message: common.DB_ERR_MESS,
			},
		}, nil
	}

	paymentsModel, err = l.svcCtx.PaymentTblModel.GetByOrderID(l.ctx, req.OrderID)
	if err != nil {
		l.Logger.Error(err)
		return &types.CreatePaymentRes{
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

	if totalPayment >= orderModel.Total {
		orderModel.Status = common.ORDER_STATUS_COMPLETED
		
		err = l.svcCtx.OrderTblModel.Update(l.ctx, orderModel)
		if err != nil {
			l.Logger.Error(err)
			return &types.CreatePaymentRes{
				Result: types.Result{
					Code:    common.DB_ERR_CODE,
					Message: common.DB_ERR_MESS,
				},
			}, nil
		}
	}

	l.Logger.Info("CreatePaymentLogic Success")
	return &types.CreatePaymentRes{
		Result: types.Result{
			Code:    common.SUCCESS_CODE,
			Message: common.SUCCESS_MESS,
		},
	}, nil
}
