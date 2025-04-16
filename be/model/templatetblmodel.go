package model

import "github.com/zeromicro/go-zero/core/stores/sqlx"

var _ TemplateTblModel = (*customTemplateTblModel)(nil)

type (
	// TemplateTblModel is an interface to be customized, add more methods here,
	// and implement the added methods in customTemplateTblModel.
	TemplateTblModel interface {
		templateTblModel
	}

	customTemplateTblModel struct {
		*defaultTemplateTblModel
	}
)

// NewTemplateTblModel returns a model for the database table.
func NewTemplateTblModel(conn sqlx.SqlConn) TemplateTblModel {
	return &customTemplateTblModel{
		defaultTemplateTblModel: newTemplateTblModel(conn),
	}
}
