package model

import (
	"context"
	"fmt"

	"github.com/zeromicro/go-zero/core/stores/sqlx"
)

var _ PaymentTblModel = (*customPaymentTblModel)(nil)

type (
	// PaymentTblModel is an interface to be customized, add more methods here,
	// and implement the added methods in customPaymentTblModel.
	PaymentTblModel interface {
		paymentTblModel
		GetByOrderID(ctx context.Context, orderID int64) ([]*PaymentTbl, error)
		CountPayment(ctx context.Context, userID, status, orderID int64) (int64, error)
		FilterPayment(ctx context.Context, userID, status, orderID int64, limit, offset int64) ([]*PaymentTbl, error)
	}

	customPaymentTblModel struct {
		*defaultPaymentTblModel
	}
)

// NewPaymentTblModel returns a model for the database table.
func NewPaymentTblModel(conn sqlx.SqlConn) PaymentTblModel {
	return &customPaymentTblModel{
		defaultPaymentTblModel: newPaymentTblModel(conn),
	}
}

// GetByOrderID implements PaymentTblModel interface.
func (m *customPaymentTblModel) GetByOrderID(ctx context.Context, orderID int64) ([]*PaymentTbl, error) {
	query := fmt.Sprintf("select %s from %s where `order_id` = ? ", paymentTblRows, m.table)
	var resp []*PaymentTbl
	err := m.conn.QueryRowsCtx(ctx, &resp, query, orderID)
	if err != nil {
		return nil, err
	}

	return resp, nil
}

// CountPayment implements PaymentTblModel interface.
func (m *customPaymentTblModel) CountPayment(ctx context.Context, userID, status, orderID int64) (int64, error) {
	query := fmt.Sprintf("select count(*) from %s where 1=1", m.table)
	var args []interface{}

	if userID != 0 {
		query += " and user_id = ?"
		args = append(args, userID)
	}
	if status != 0 {
		query += " and status = ?"
		args = append(args, status)
	}
	if orderID != 0 {
		query += " and order_id = ?"
		args = append(args, orderID)
	}

	var count int64
	err := m.conn.QueryRowCtx(ctx, &count, query, args...)
	if err != nil {
		return 0, err
	}

	return count, nil
}

// FilterPayment implements PaymentTblModel interface.
func (m *customPaymentTblModel) FilterPayment(ctx context.Context, userID, status, orderID int64, limit, offset int64) ([]*PaymentTbl, error) {
	query := fmt.Sprintf("select %s from %s where 1=1", paymentTblRows, m.table)
	var args []interface{}

	if userID != 0 {
		query += " and user_id = ?"
		args = append(args, userID)
	}
	if status != 0 {
		query += " and status = ?"
		args = append(args, status)
	}
	if orderID != 0 {
		query += " and order_id = ?"
		args = append(args, orderID)
	}
	if limit != 0 {
		query += " limit ? offset ?"
		args = append(args, limit, offset)
	}

	var resp []*PaymentTbl
	err := m.conn.QueryRowsCtx(ctx, &resp, query, args...)
	if err != nil {
		return nil, err
	}

	return resp, nil
}
