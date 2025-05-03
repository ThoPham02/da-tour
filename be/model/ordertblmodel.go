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
		CountFilter(ctx context.Context, userID, status, tourID int64) (int64, error)
		FilterOrder(ctx context.Context, userID, status, tourID int64, limit, offset int64) ([]*OrderTbl, error)
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
	query := "SELECT COUNT(*) FROM `order_tbl`"
	err := m.conn.QueryRowCtx(ctx, &count, query)
	if err != nil {
		return 0, err
	}
	return count, nil
}

// CountFilter counts the number of records in the order table based on the given filters.
func (m *customOrderTblModel) CountFilter(ctx context.Context, userID, status, tourID int64) (int64, error) {
	var count int64
	query := "SELECT COUNT(*) FROM `order_tbl` WHERE 1=1"
	args := []interface{}{}

	if userID != 0 {
		query += " AND user_id = ?"
		args = append(args, userID)
	}
	if status != 0 {
		query += " AND status = ?"
		args = append(args, status)
	}
	if tourID != 0 {
		query += " AND tour_id = ?"
		args = append(args, tourID)
	}

	err := m.conn.QueryRowCtx(ctx, &count, query, args...)
	if err != nil {
		return 0, err
	}
	return count, nil
}

// FilterOrder retrieves a list of orders based on the given filters, limit, and offset.
func (m *customOrderTblModel) FilterOrder(ctx context.Context, userID, status, tourID int64, limit, offset int64) ([]*OrderTbl, error) {
	var orders []*OrderTbl
	query := "SELECT * FROM `order_tbl` WHERE 1=1"
	args := []interface{}{}

	if userID != 0 {
		query += " AND user_id = ?"
		args = append(args, userID)
	}
	if status != 0 {
		query += " AND status = ?"
		args = append(args, status)
	}
	if tourID != 0 {
		query += " AND tour_id = ?"
		args = append(args, tourID)
	}

	if limit != 0 {
		query += " LIMIT ? OFFSET ?"
		args = append(args, limit, offset)
	}

	err := m.conn.QueryRowsCtx(ctx, &orders, query, args...)
	if err != nil {
		return nil, err
	}
	return orders, nil
}