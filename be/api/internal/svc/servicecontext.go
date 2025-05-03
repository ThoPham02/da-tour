package svc

import (
	"da-tour/api/internal/config"
	"da-tour/api/internal/middleware"
	"da-tour/storage"

	"da-tour/model"

	"github.com/zeromicro/go-zero/core/stores/sqlx"
	"github.com/zeromicro/go-zero/rest"
)

type ServiceContext struct {
	Config              config.Config
	CldClient           *storage.CloudinaryClient
	UserTokenMiddleware rest.Middleware

	UserTblModel      model.UserTblModel
	TourTblModel      model.TourTblModel
	ActivityTblModel  model.ActivityTblModel
	ItineraryTblModel model.ItineraryTblModel
	ServiceTblModel   model.ServiceTblModel
}

func NewServiceContext(c config.Config) *ServiceContext {
	return &ServiceContext{
		Config: c,
		CldClient: storage.NewCloudinaryClient(
			c.Storage.CloudName,
			c.Storage.APIKey,
			c.Storage.APISecret,
			c.Storage.DirName,
		),
		UserTokenMiddleware: middleware.NewUserTokenMiddleware().Handle,

		UserTblModel:      model.NewUserTblModel(sqlx.NewMysql(c.DataSource)),
		TourTblModel:      model.NewTourTblModel(sqlx.NewMysql(c.DataSource)),
		ActivityTblModel:  model.NewActivityTblModel(sqlx.NewMysql(c.DataSource)),
		ItineraryTblModel: model.NewItineraryTblModel(sqlx.NewMysql(c.DataSource)),
		ServiceTblModel:   model.NewServiceTblModel(sqlx.NewMysql(c.DataSource)),
	}
}
