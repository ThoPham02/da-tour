package logic

import (
	"context"

	"da-tour/api/internal/svc"
	"da-tour/api/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type UpdateTourLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewUpdateTourLogic(ctx context.Context, svcCtx *svc.ServiceContext) *UpdateTourLogic {
	return &UpdateTourLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *UpdateTourLogic) UpdateTour(req *types.UpdateTourReq) (resp *types.UpdateTourRes, err error) {
	// todo: add your logic here and delete this line

	return
}
