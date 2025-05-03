package logic

import (
	"context"

	"da-tour/api/internal/svc"
	"da-tour/api/internal/types"
	"da-tour/common"
	"da-tour/model"

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
	l.Logger.Info("TourDetail req:", req)

	var tourModel *model.TourTbl
	var itinerariesModel []*model.ItineraryTbl
	var activitiesModel []*model.ActivityTbl
	var servicesModel []*model.ServiceTbl

	var tour types.Tour

	tourModel, err = l.svcCtx.TourTblModel.FindOne(l.ctx, req.TourID)
	if err != nil {
		l.Logger.Error(err)
		if err == model.ErrNotFound || tourModel == nil {
			return &types.TourDetailRes{
				Result: types.Result{
					Code:    common.NOT_FOUND_CODE,
					Message: common.NOT_FOUND_MESS,
				},
			}, nil
		}
		return &types.TourDetailRes{
			Result: types.Result{
				Code:    common.DB_ERR_CODE,
				Message: common.DB_ERR_MESS,
			},
		}, nil
	}

	itinerariesModel, err = l.svcCtx.ItineraryTblModel.FindByTourID(l.ctx, req.TourID)
	if err != nil {
		l.Logger.Error(err)
		if err == model.ErrNotFound || itinerariesModel == nil {
			return &types.TourDetailRes{
				Result: types.Result{
					Code:    common.NOT_FOUND_CODE,
					Message: common.NOT_FOUND_MESS,
				},
			}, nil
		}
		return &types.TourDetailRes{
			Result: types.Result{
				Code:    common.DB_ERR_CODE,
				Message: common.DB_ERR_MESS,
			},
		}, nil
	}
	for _, itinerary := range itinerariesModel {
		tour.Itineraries = append(tour.Itineraries, types.Itinerary{
			ID:          itinerary.Id,
			Name:        itinerary.Name,
			Description: itinerary.Description.String,
		})
	}

	activitiesModel, err = l.svcCtx.ActivityTblModel.FindByTourID(l.ctx, req.TourID)
	if err != nil {
		l.Logger.Error(err)
		if err == model.ErrNotFound || activitiesModel == nil {
			return &types.TourDetailRes{
				Result: types.Result{
					Code:    common.NOT_FOUND_CODE,
					Message: common.NOT_FOUND_MESS,
				},
			}, nil
		}
		return &types.TourDetailRes{
			Result: types.Result{
				Code:    common.DB_ERR_CODE,
				Message: common.DB_ERR_MESS,
			},
		}, nil
	}
	for _, activity := range activitiesModel {
		tour.Activities = append(tour.Activities, types.Activity{
			ID:     activity.Id,
			Title:  activity.Name,
			Detail: activity.Description.String,
		})
	}

	servicesModel, err = l.svcCtx.ServiceTblModel.FindByTourID(l.ctx, req.TourID)
	if err != nil {
		l.Logger.Error(err)
		if err == model.ErrNotFound || servicesModel == nil {
			return &types.TourDetailRes{
				Result: types.Result{
					Code:    common.NOT_FOUND_CODE,
					Message: common.NOT_FOUND_MESS,
				},
			}, nil
		}
		return &types.TourDetailRes{
			Result: types.Result{
				Code:    common.DB_ERR_CODE,
				Message: common.DB_ERR_MESS,
			},
		}, nil
	}
	for _, service := range servicesModel {
		tour.Services = append(tour.Services, types.Service{
			ID:     service.Id,
			Title:  service.Name,
			Detail: service.Description.String,
		})
	}

	tour.ID = tourModel.Id
	tour.Image = tourModel.Image
	tour.Name = tourModel.Name
	tour.Description = tourModel.Description.String
	tour.Duration = tourModel.Duration
	tour.Location = tourModel.Location
	tour.Overview = tourModel.Overview.String
	tour.Price = tourModel.Price
	tour.Quantity = tourModel.Quantity
	tour.Remain = tourModel.Remain
	tour.DepartureDate = tourModel.DepartureDate.Int64
	tour.Status = tourModel.Status

	return &types.TourDetailRes{
		Result: types.Result{
			Code:    common.SUCCESS_CODE,
			Message: common.SUCCESS_MESS,
		},
		Tour: tour,
	}, nil
}
