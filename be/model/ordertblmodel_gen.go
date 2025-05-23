// Code generated by goctl. DO NOT EDIT.

package model

import (
	"context"
	"database/sql"
	"fmt"
	"strings"

	"github.com/zeromicro/go-zero/core/stores/builder"
	"github.com/zeromicro/go-zero/core/stores/sqlc"
	"github.com/zeromicro/go-zero/core/stores/sqlx"
	"github.com/zeromicro/go-zero/core/stringx"
)

var (
	orderTblFieldNames          = builder.RawFieldNames(&OrderTbl{})
	orderTblRows                = strings.Join(orderTblFieldNames, ",")
	orderTblRowsExpectAutoSet   = strings.Join(stringx.Remove(orderTblFieldNames), ",")
	orderTblRowsWithPlaceHolder = strings.Join(stringx.Remove(orderTblFieldNames, "`id`"), "=?,") + "=?"
)

type (
	orderTblModel interface {
		Insert(ctx context.Context, data *OrderTbl) (sql.Result, error)
		FindOne(ctx context.Context, id int64) (*OrderTbl, error)
		Update(ctx context.Context, data *OrderTbl) error
		Delete(ctx context.Context, id int64) error
	}

	defaultOrderTblModel struct {
		conn  sqlx.SqlConn
		table string
	}

	OrderTbl struct {
		Id            int64         `db:"id"`
		UserId        sql.NullInt64 `db:"user_id"`
		UserName      string        `db:"user_name"`
		Phone         string        `db:"phone"`
		Email         string        `db:"email"`
		Code          string        `db:"code"`
		TourId        int64         `db:"tour_id"`
		Quantity      int64         `db:"quantity"`
		Total         float64       `db:"total"`
		Status        int64         `db:"status"`
		PaymentStatus int64         `db:"payment_status"`
		CreatedAt     sql.NullInt64 `db:"created_at"`
		UpdatedAt     sql.NullInt64 `db:"updated_at"`
	}
)

func newOrderTblModel(conn sqlx.SqlConn) *defaultOrderTblModel {
	return &defaultOrderTblModel{
		conn:  conn,
		table: "`order_tbl`",
	}
}

func (m *defaultOrderTblModel) Delete(ctx context.Context, id int64) error {
	query := fmt.Sprintf("delete from %s where `id` = ?", m.table)
	_, err := m.conn.ExecCtx(ctx, query, id)
	return err
}

func (m *defaultOrderTblModel) FindOne(ctx context.Context, id int64) (*OrderTbl, error) {
	query := fmt.Sprintf("select %s from %s where `id` = ? limit 1", orderTblRows, m.table)
	var resp OrderTbl
	err := m.conn.QueryRowCtx(ctx, &resp, query, id)
	switch err {
	case nil:
		return &resp, nil
	case sqlc.ErrNotFound:
		return nil, ErrNotFound
	default:
		return nil, err
	}
}

func (m *defaultOrderTblModel) Insert(ctx context.Context, data *OrderTbl) (sql.Result, error) {
	query := fmt.Sprintf("insert into %s (%s) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", m.table, orderTblRowsExpectAutoSet)
	ret, err := m.conn.ExecCtx(ctx, query, data.Id, data.UserId, data.UserName, data.Phone, data.Email, data.Code, data.TourId, data.Quantity, data.Total, data.Status, data.PaymentStatus, data.CreatedAt, data.UpdatedAt)
	return ret, err
}

func (m *defaultOrderTblModel) Update(ctx context.Context, data *OrderTbl) error {
	query := fmt.Sprintf("update %s set %s where `id` = ?", m.table, orderTblRowsWithPlaceHolder)
	_, err := m.conn.ExecCtx(ctx, query, data.UserId, data.UserName, data.Phone, data.Email, data.Code, data.TourId, data.Quantity, data.Total, data.Status, data.PaymentStatus, data.CreatedAt, data.UpdatedAt, data.Id)
	return err
}

func (m *defaultOrderTblModel) tableName() string {
	return m.table
}
