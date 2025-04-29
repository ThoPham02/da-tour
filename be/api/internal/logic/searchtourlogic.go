package logic

import (
	"context"

	"da-tour/api/internal/svc"
	"da-tour/api/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type SearchTourLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewSearchTourLogic(ctx context.Context, svcCtx *svc.ServiceContext) *SearchTourLogic {
	return &SearchTourLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *SearchTourLogic) SearchTour(req *types.SearchTourReq) (resp *types.SearchTourRes, err error) {
	// todo: add your logic here and delete this line

	return
}
