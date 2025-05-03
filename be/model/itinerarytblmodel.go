package model

import (
	"context"
	"fmt"

	"github.com/zeromicro/go-zero/core/stores/sqlc"
	"github.com/zeromicro/go-zero/core/stores/sqlx"
)

var _ ItineraryTblModel = (*customItineraryTblModel)(nil)

type (
	// ItineraryTblModel is an interface to be customized, add more methods here,
	// and implement the added methods in customItineraryTblModel.
	ItineraryTblModel interface {
		itineraryTblModel
		FindByTourID(ctx context.Context, tourID int64) ([]*ItineraryTbl, error)
	}

	customItineraryTblModel struct {
		*defaultItineraryTblModel
	}
)

// NewItineraryTblModel returns a model for the database table.
func NewItineraryTblModel(conn sqlx.SqlConn) ItineraryTblModel {
	return &customItineraryTblModel{
		defaultItineraryTblModel: newItineraryTblModel(conn),
	}
}

// FindByTourID implements ItineraryTblModel interface.
func (m *customItineraryTblModel) FindByTourID(ctx context.Context, tourID int64) ([]*ItineraryTbl, error) {
	query := fmt.Sprintf("select %s from %s where `tour_id` = ?", itineraryTblRows, m.table)
	var resp []*ItineraryTbl
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
