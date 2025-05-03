package logic

import (
	"context"

	"da-tour/api/internal/svc"
	"da-tour/api/internal/types"
	"da-tour/common"
	"da-tour/model"

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
	l.Logger.Info("SearchTour req:", req)

	var toursModel []*model.TourTbl
	var total int64

	total, err = l.svcCtx.TourTblModel.CountTour(l.ctx, req.Location, req.DepartureDate)
	if err != nil {
		l.Logger.Error(err)
		return &types.SearchTourRes{
			Result: types.Result{
				Code:    common.DB_ERR_CODE,
				Message: common.DB_ERR_MESS,
			},
		}, nil
	}
	if total == 0 {
		return &types.SearchTourRes{
			Result: types.Result{
				Code:    common.SUCCESS_CODE,
				Message: common.SUCCESS_MESS,
			},
		}, nil
	}

	toursModel, err = l.svcCtx.TourTblModel.FilterTour(l.ctx, req.Location, req.DepartureDate, req.Limit, req.Offset)
	if err != nil {
		l.Logger.Error(err)
		return &types.SearchTourRes{
			Result: types.Result{
				Code:    common.DB_ERR_CODE,
				Message: common.DB_ERR_MESS,
			},
		}, nil
	}

	for _, tourModel := range toursModel {
		resp.Tours = append(resp.Tours, types.Tour{
			ID:            tourModel.Id,
			Name:          tourModel.Name,
			Image:         tourModel.Image,
			Description:   tourModel.Description.String,
			Duration:      tourModel.Duration,
			Location:      tourModel.Location,
			Overview:      tourModel.Overview.String,
			Price:         tourModel.Price,
			DepartureDate: tourModel.DepartureDate.Int64,
			Quantity:      tourModel.Quantity,
			Remain:        tourModel.Remain,
			Status:        tourModel.Status,
		})
	}

	return &types.SearchTourRes{
		Result: types.Result{
			Code:    common.SUCCESS_CODE,
			Message: common.SUCCESS_MESS,
		},
		Tours: resp.Tours,
		Total: total,
	}, nil
}
