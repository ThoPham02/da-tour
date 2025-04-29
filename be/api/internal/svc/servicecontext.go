package svc

import (
	"da-tour/api/internal/config"
	"da-tour/api/internal/middleware"

	"da-tour/model"

	"github.com/zeromicro/go-zero/core/stores/sqlx"
	"github.com/zeromicro/go-zero/rest"
)

type ServiceContext struct {
	Config              config.Config
	UserTokenMiddleware rest.Middleware

	UserTblModel     model.UserTblModel
	TourTblModel     model.TourTblModel
	IncludedTblModel model.IncludedTblModel
	JourneyTblModel  model.JourneyTblModel
}

func NewServiceContext(c config.Config) *ServiceContext {
	return &ServiceContext{
		Config:              c,
		UserTokenMiddleware: middleware.NewUserTokenMiddleware().Handle,

		UserTblModel:     model.NewUserTblModel(sqlx.NewMysql(c.DataSource)),
		TourTblModel:     model.NewTourTblModel(sqlx.NewMysql(c.DataSource)),
		IncludedTblModel: model.NewIncludedTblModel(sqlx.NewMysql(c.DataSource)),
		JourneyTblModel:  model.NewJourneyTblModel(sqlx.NewMysql(c.DataSource)),
	}
}
