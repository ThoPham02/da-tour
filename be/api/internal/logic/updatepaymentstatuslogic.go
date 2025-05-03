package logic

import (
	"context"

	"da-tour/api/internal/svc"
	"da-tour/api/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type UpdatePaymentStatusLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewUpdatePaymentStatusLogic(ctx context.Context, svcCtx *svc.ServiceContext) *UpdatePaymentStatusLogic {
	return &UpdatePaymentStatusLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *UpdatePaymentStatusLogic) UpdatePaymentStatus(req *types.UpdatePaymentStatusReq) (resp *types.UpdatePaymentStatusRes, err error) {
	// todo: add your logic here and delete this line

	return
}
