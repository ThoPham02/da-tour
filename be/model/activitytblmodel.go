package model

import (
	"context"
	"fmt"

	"github.com/zeromicro/go-zero/core/stores/sqlc"
	"github.com/zeromicro/go-zero/core/stores/sqlx"
)

var _ ActivityTblModel = (*customActivityTblModel)(nil)

type (
	// ActivityTblModel is an interface to be customized, add more methods here,
	// and implement the added methods in customActivityTblModel.
	ActivityTblModel interface {
		activityTblModel
		FindByTourID(ctx context.Context, tourID int64) ([]*ActivityTbl, error)
	}

	customActivityTblModel struct {
		*defaultActivityTblModel
	}
)

// NewActivityTblModel returns a model for the database table.
func NewActivityTblModel(conn sqlx.SqlConn) ActivityTblModel {
	return &customActivityTblModel{
		defaultActivityTblModel: newActivityTblModel(conn),
	}
}

// FindByTourID implements ActivityTblModel interface.
func (m *customActivityTblModel) FindByTourID(ctx context.Context, tourID int64) ([]*ActivityTbl, error) {
	query := fmt.Sprintf("select %s from %s where `tour_id` = ?", activityTblRows, m.table)
	var resp []*ActivityTbl
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
