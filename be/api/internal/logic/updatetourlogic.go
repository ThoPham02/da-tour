package logic

import (
	"context"
	"database/sql"
	"encoding/json"

	"da-tour/api/internal/svc"
	"da-tour/api/internal/types"
	"da-tour/api/internal/utils"
	"da-tour/common"
	"da-tour/model"

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
	l.Logger.Info("UpdateTour ", req)

	var tourModel *model.TourTbl

	var currentTime int64 = utils.GetTimeNow()

	tourModel, err = l.svcCtx.TourTblModel.FindOne(l.ctx, req.TourID)
	if err != nil || tourModel == nil {
		l.Logger.Error(err)
		return &types.UpdateTourRes{
			Result: types.Result{
				Code:    common.DB_ERR_CODE,
				Message: common.DB_ERR_MESS,
			},
		}, nil
	}
	if tourModel.Status != common.TOUR_STATUS_ACTIVE {
		l.Logger.Error("Tour status is not pending")
		return &types.UpdateTourRes{
			Result: types.Result{
				Code:    common.TOUR_STATUS_ERR_CODE,
				Message: common.TOUR_STATUS_ERR_MESS,
			},
		}, nil
	}

	err = l.svcCtx.ActivityTblModel.DeleteByTourID(l.ctx, req.TourID)
	if err != nil {
		l.Logger.Error(err)
		return &types.UpdateTourRes{
			Result: types.Result{
				Code:    common.DB_ERR_CODE,
				Message: common.DB_ERR_MESS,
			},
		}, nil
	}
	err = l.svcCtx.ServiceTblModel.DeleteByTourID(l.ctx, req.TourID)
	if err != nil {
		l.Logger.Error(err)
		return &types.UpdateTourRes{
			Result: types.Result{
				Code:    common.DB_ERR_CODE,
				Message: common.DB_ERR_MESS,
			},
		}, nil
	}
	err = l.svcCtx.ItineraryTblModel.DeleteByTourID(l.ctx, req.TourID)
	if err != nil {
		l.Logger.Error(err)
		return &types.UpdateTourRes{
			Result: types.Result{
				Code:    common.DB_ERR_CODE,
				Message: common.DB_ERR_MESS,
			},
		}, nil
	}

	// get id
	var tourID int64 = req.TourID
	if len(req.Activities) > 0 {
		var activities []types.Activity
		activityID := utils.GetID()

		err = json.Unmarshal([]byte(req.Activities), &activities)
		if err != nil {
			l.Logger.Error(err)
			return &types.UpdateTourRes{
				Result: types.Result{
					Code:    common.INVALID_REQUEST_CODE,
					Message: common.INVALID_REQUEST_MESS,
				},
			}, nil
		}

		// Create activities in the database
		for _, activity := range activities {
			_, err = l.svcCtx.ActivityTblModel.Insert(
				l.ctx,
				&model.ActivityTbl{
					Id:          activityID,
					TourId:      sql.NullInt64{Valid: true, Int64: tourID},
					Name:        activity.Title,
					Description: sql.NullString{Valid: true, String: activity.Detail},
					CreatedAt:   sql.NullInt64{Valid: true, Int64: currentTime},
					UpdatedAt:   sql.NullInt64{Valid: true, Int64: currentTime},
				},
			)
			if err != nil {
				l.Logger.Error(err)
				return &types.UpdateTourRes{
					Result: types.Result{
						Code:    common.DB_ERR_CODE,
						Message: common.DB_ERR_MESS,
					},
				}, nil
			}
			activityID++
		}
	}

	if len(req.Services) > 0 {
		var services []types.Service
		serviceID := utils.GetID()

		err = json.Unmarshal([]byte(req.Services), &services)
		if err != nil {
			l.Logger.Error(err)
			return &types.UpdateTourRes{
				Result: types.Result{
					Code:    common.INVALID_REQUEST_CODE,
					Message: common.INVALID_REQUEST_MESS,
				},
			}, nil
		}

		// Create Services in the database
		for _, service := range services {
			_, err = l.svcCtx.ServiceTblModel.Insert(
				l.ctx,
				&model.ServiceTbl{
					Id:          serviceID,
					TourId:      sql.NullInt64{Valid: true, Int64: tourID},
					Name:        service.Title,
					Description: sql.NullString{Valid: true, String: service.Detail},
					CreatedAt:   sql.NullInt64{Valid: true, Int64: currentTime},
					UpdatedAt:   sql.NullInt64{Valid: true, Int64: currentTime},
				},
			)
			if err != nil {
				l.Logger.Error(err)
				return &types.UpdateTourRes{
					Result: types.Result{
						Code:    common.DB_ERR_CODE,
						Message: common.DB_ERR_MESS,
					},
				}, nil
			}
			serviceID++
		}
	}

	if len(req.Itinerary) > 0 {
		var itinerarys []types.Itinerary
		itineraryID := utils.GetID()

		err = json.Unmarshal([]byte(req.Itinerary), &itinerarys)
		if err != nil {
			l.Logger.Error("CreateTour unmarshal error:", err)
			return &types.UpdateTourRes{
				Result: types.Result{
					Code:    common.INVALID_REQUEST_CODE,
					Message: common.INVALID_REQUEST_MESS,
				},
			}, nil
		}

		// Create Itinerary in the database
		for _, itinerary := range itinerarys {
			_, err = l.svcCtx.ItineraryTblModel.Insert(
				l.ctx,
				&model.ItineraryTbl{
					Id:          itineraryID,
					TourId:      sql.NullInt64{Valid: true, Int64: tourID},
					Name:        itinerary.Name,
					Description: sql.NullString{Valid: true, String: itinerary.Description},
					CreatedAt:   sql.NullInt64{Valid: true, Int64: currentTime},
					UpdatedAt:   sql.NullInt64{Valid: true, Int64: currentTime},
				},
			)
			if err != nil {
				l.Logger.Error(err)
				return &types.UpdateTourRes{
					Result: types.Result{
						Code:    common.DB_ERR_CODE,
						Message: common.DB_ERR_MESS,
					},
				}, nil
			}
			itineraryID++
		}
	}

	// Update Tour in the database
	tourModel.Name = req.Name
	tourModel.Description = sql.NullString{Valid: true, String: req.Description}
	tourModel.DepartureDate = sql.NullInt64{Valid: true, Int64: req.DepartureDate}
	tourModel.Duration = req.Duration
	tourModel.Price = req.Price
	tourModel.Image = req.Image
	tourModel.Location = req.Location
	tourModel.Overview = sql.NullString{Valid: true, String: req.Overview}
	tourModel.Quantity = req.Seats
	tourModel.UpdatedAt = sql.NullInt64{Valid: true, Int64: currentTime}
	err = l.svcCtx.TourTblModel.Update(l.ctx, tourModel)
	if err != nil {
		l.Logger.Error(err)
		return &types.UpdateTourRes{
			Result: types.Result{
				Code:    common.DB_ERR_CODE,
				Message: common.DB_ERR_MESS,
			},
		}, nil
	}

	l.Logger.Info("UpdateTour Success ")
	return &types.UpdateTourRes{
		Result: types.Result{
			Code:    common.SUCCESS_CODE,
			Message: common.SUCCESS_MESS,
		},
	}, nil
}
