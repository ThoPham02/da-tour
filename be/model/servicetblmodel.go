package model

import (
	"context"
	"fmt"

	"github.com/zeromicro/go-zero/core/stores/sqlc"
	"github.com/zeromicro/go-zero/core/stores/sqlx"
)

var _ ServiceTblModel = (*customServiceTblModel)(nil)

type (
	// ServiceTblModel is an interface to be customized, add more methods here,
	// and implement the added methods in customServiceTblModel.
	ServiceTblModel interface {
		serviceTblModel
		FindByTourID(ctx context.Context, tourID int64) ([]*ServiceTbl, error)
		DeleteByTourID(ctx context.Context, tourID int64) error
	}

	customServiceTblModel struct {
		*defaultServiceTblModel
	}
)

// NewServiceTblModel returns a model for the database table.
func NewServiceTblModel(conn sqlx.SqlConn) ServiceTblModel {
	return &customServiceTblModel{
		defaultServiceTblModel: newServiceTblModel(conn),
	}
}

// FindByTourID implements ServiceTblModel interface.
func (m *customServiceTblModel) FindByTourID(ctx context.Context, tourID int64) ([]*ServiceTbl, error) {
	query := fmt.Sprintf("select %s from %s where `tour_id` = ?", serviceTblRows, m.table)
	var resp []*ServiceTbl
	err := m.conn.QueryRowsCtx(ctx, &resp, query, tourID)
	switch err {
	case nil:
		return resp, nil
	case sqlc.ErrNotFound:
		return nil, ErrNotFound
	default:
		return nil, err
	}
}

// DeleteByTourID implements ServiceTblModel interface.
func (m *customServiceTblModel) DeleteByTourID(ctx context.Context, tourID int64) error {
	query := fmt.Sprintf("delete from %s where `tour_id` = ?", m.table)
	_, err := m.conn.ExecCtx(ctx, query, tourID)
	if err != nil {
		return err
	}
	return nil
}