package logic

import (
	"context"

	"da-tour/api/internal/svc"
	"da-tour/api/internal/types"

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
	// todo: add your logic here and delete this line

	return
}
