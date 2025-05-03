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
