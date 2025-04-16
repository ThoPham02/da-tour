package svc

import (
	"da-tour/api/internal/config"

	"da-tour/model"

	"github.com/zeromicro/go-zero/core/stores/sqlx"
)

type ServiceContext struct {
	Config       config.Config
	UserTblModel model.UserTblModel
}

func NewServiceContext(c config.Config) *ServiceContext {
	return &ServiceContext{
		Config: c,
		UserTblModel: model.NewUserTblModel(sqlx.NewMysql(c.DataSource)),
	}
}
