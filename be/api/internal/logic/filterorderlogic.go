package logic

import (
	"context"

	"da-tour/api/internal/svc"
	"da-tour/api/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type FilterOrderLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewFilterOrderLogic(ctx context.Context, svcCtx *svc.ServiceContext) *FilterOrderLogic {
	return &FilterOrderLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *FilterOrderLogic) FilterOrder(req *types.FilterOrderReq) (resp *types.FilterOrderRes, err error) {
	// todo: add your logic here and delete this line

	return
}
