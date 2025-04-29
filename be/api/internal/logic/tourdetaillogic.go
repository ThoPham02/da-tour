package logic

import (
	"context"

	"da-tour/api/internal/svc"
	"da-tour/api/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type TourDetailLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewTourDetailLogic(ctx context.Context, svcCtx *svc.ServiceContext) *TourDetailLogic {
	return &TourDetailLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *TourDetailLogic) TourDetail(req *types.TourDetailReq) (resp *types.TourDetailRes, err error) {
	// todo: add your logic here and delete this line

	return
}
