package logic

import (
	"context"

	"da-tour/api/internal/svc"
	"da-tour/api/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type UpdatePaymentLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewUpdatePaymentLogic(ctx context.Context, svcCtx *svc.ServiceContext) *UpdatePaymentLogic {
	return &UpdatePaymentLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *UpdatePaymentLogic) UpdatePayment(req *types.UpdatePaymentReq) (resp *types.UpdatePaymentRes, err error) {
	// todo: add your logic here and delete this line

	return
}
