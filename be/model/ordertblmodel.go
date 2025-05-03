package model

import (
	"context"

	"github.com/zeromicro/go-zero/core/stores/sqlx"
)

var _ OrderTblModel = (*customOrderTblModel)(nil)

type (
	// OrderTblModel is an interface to be customized, add more methods here,
	// and implement the added methods in customOrderTblModel.
	OrderTblModel interface {
		orderTblModel
		Count(ctx context.Context) (int64, error)
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

// Count counts the number of records in the order table.
func (m *customOrderTblModel) Count(ctx context.Context) (int64, error) {
	var count int64
	query := "SELECT COUNT(*) FROM `order`"
	err := m.conn.QueryRowCtx(ctx, &count, query)
	if err != nil {
		return 0, err
	}
	return count, nil
}