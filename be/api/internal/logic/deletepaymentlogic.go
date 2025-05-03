package logic

import (
	"context"

	"da-tour/api/internal/svc"
	"da-tour/api/internal/types"

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
	// todo: add your logic here and delete this line

	return
}
