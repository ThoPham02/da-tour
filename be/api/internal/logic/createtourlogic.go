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

	var currentTime int64 = utils.GetTimeNow()

	// Validate the request
	if err := l.Validate(req); err != nil {
		l.Logger.Error(err)
		return &types.CreateTourRes{
			Result: types.Result{
				Code:    common.INVALID_REQUEST_CODE,
				Message: common.INVALID_REQUEST_MESS,
			},
		}, nil
	}

	// get id
	var tourID int64 = utils.GetID()
	if len(req.Activities) > 0 {
		var activities []types.Activity
		activityID := utils.GetID()

		err = json.Unmarshal([]byte(req.Activities), &activities)
		if err != nil {
			l.Logger.Error(err)
			return &types.CreateTourRes{
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
				return &types.CreateTourRes{
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
			return &types.CreateTourRes{
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
				return &types.CreateTourRes{
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
			return &types.CreateTourRes{
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
				return &types.CreateTourRes{
					Result: types.Result{
						Code:    common.DB_ERR_CODE,
						Message: common.DB_ERR_MESS,
					},
				}, nil
			}
			itineraryID++
		}
	}

	// Create the tour in the database
	_, err = l.svcCtx.TourTblModel.Insert(l.ctx, &model.TourTbl{
		Id:            tourID,
		Image:         req.Image,
		Name:          req.Name,
		Description:   sql.NullString{Valid: true, String: req.Description},
		Duration:      req.Duration,
		Location:      req.Location,
		Overview:      sql.NullString{Valid: true, String: req.Overview},
		Price:         req.Price,
		Quantity:      req.Seats,
		Remain:        req.Seats,
		DepartureDate: sql.NullInt64{Valid: true, Int64: req.DepartureDate},
		Status:        common.TOUR_STATUS_ACTIVE,
		CreatedAt:     sql.NullInt64{Valid: true, Int64: currentTime},
		UpdatedAt:     sql.NullInt64{Valid: true, Int64: currentTime},
	})
	if err != nil {
		l.Logger.Error("CreateTour insert error:", err)
		return &types.CreateTourRes{
			Result: types.Result{
				Code:    common.DB_ERR_CODE,
				Message: common.DB_ERR_MESS,
			},
		}, nil
	}

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
	return nil
}
