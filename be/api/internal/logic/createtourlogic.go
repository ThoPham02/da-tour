package logic

import (
	"context"
	"fmt"

	"da-tour/api/internal/svc"
	"da-tour/api/internal/types"
	"da-tour/common"

	"github.com/zeromicro/go-zero/core/logx"
)

type CreateTourLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewCreateTourLogic(ctx context.Context, svcCtx *svc.ServiceContext) *CreateTourLogic {
	return &CreateTourLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *CreateTourLogic) CreateTour(req *types.CreateTourReq) (resp *types.CreateTourRes, err error) {
	l.Logger.Info("CreateTour req:", req)

	// Validate the request
	if err := l.Validate(req); err != nil {
		l.Logger.Error("CreateTour validation error:", err)
		return &types.CreateTourRes{
			Result: types.Result{
				Code:    common.INVALID_REQUEST_CODE,
				Message: common.INVALID_REQUEST_MESS,
			},
		}, nil
	}

	// Create the tour in the database
	// _, err = l.svcCtx.TourModel.Insert(l.ctx, &model.Tour{

	// })

	l.Logger.Info("CreateTour success")
	return &types.CreateTourRes{
		Result: types.Result{
			Code:    common.SUCCESS_CODE,
			Message: common.SUCCESS_MESS,
		},
	}, nil
}

// Validate validates the CreateTour request
func (l *CreateTourLogic) Validate(req *types.CreateTourReq) error {
	if req.Name == "" {
		return fmt.Errorf("tour name is required")
	}
	if req.Description == "" {
		return fmt.Errorf("tour description is required")
	}
	if req.Price <= 0 {
		return fmt.Errorf("tour price must be greater than 0")
	}
	if req.Duration <= 0 {
		return fmt.Errorf("tour duration must be greater than 0")
	}
	return nil
}
