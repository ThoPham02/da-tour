package model

import "github.com/zeromicro/go-zero/core/stores/sqlx"

var _ RequestTblModel = (*customRequestTblModel)(nil)

type (
	// RequestTblModel is an interface to be customized, add more methods here,
	// and implement the added methods in customRequestTblModel.
	RequestTblModel interface {
		requestTblModel
	}

	customRequestTblModel struct {
		*defaultRequestTblModel
	}
)

// NewRequestTblModel returns a model for the database table.
func NewRequestTblModel(conn sqlx.SqlConn) RequestTblModel {
	return &customRequestTblModel{
		defaultRequestTblModel: newRequestTblModel(conn),
	}
}
