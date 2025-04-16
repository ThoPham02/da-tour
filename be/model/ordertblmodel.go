package model

import "github.com/zeromicro/go-zero/core/stores/sqlx"

var _ OrderTblModel = (*customOrderTblModel)(nil)

type (
	// OrderTblModel is an interface to be customized, add more methods here,
	// and implement the added methods in customOrderTblModel.
	OrderTblModel interface {
		orderTblModel
	}

	customOrderTblModel struct {
		*defaultOrderTblModel
	}
)

// NewOrderTblModel returns a model for the database table.
func NewOrderTblModel(conn sqlx.SqlConn) OrderTblModel {
	return &customOrderTblModel{
		defaultOrderTblModel: newOrderTblModel(conn),
	}
}
