package model

import (
	"context"

	"github.com/zeromicro/go-zero/core/stores/sqlx"
)

var _ TourTblModel = (*customTourTblModel)(nil)

type (
	// TourTblModel is an interface to be customized, add more methods here,
	// and implement the added methods in customTourTblModel.
	TourTblModel interface {
		tourTblModel
		FilterTour(ctx context.Context, location int64, departureDate int64, limit int64, offset int64) ([]*TourTbl, error)
		CountTour(ctx context.Context, location int64, departureDate int64) (int64, error)
	}

	customTourTblModel struct {
		*defaultTourTblModel
	}
)

// NewTourTblModel returns a model for the database table.
func NewTourTblModel(conn sqlx.SqlConn) TourTblModel {
	return &customTourTblModel{
		defaultTourTblModel: newTourTblModel(conn),
	}
}

// FilterTour implements TourTblModel interface.
func (m *customTourTblModel) FilterTour(ctx context.Context, location int64, departureDate int64, limit int64, offset int64) ([]*TourTbl, error) {
	var tours []*TourTbl
	query := `SELECT * FROM tour_tbl where 1=1 `

	if location != 0 {
		query += `AND location = ? `
	}
	if departureDate != 0 {
		query += `AND departure_date = ? `
	}
	if limit != 0 {
		query += `LIMIT ? OFFSET ?`
	}

	err := m.conn.QueryRowsCtx(ctx, &tours, query, location, departureDate, limit, offset)
	if err != nil {
		return nil, err
	}
	return tours, nil
}

// CountTour implements TourTblModel interface.
func (m *customTourTblModel) CountTour(ctx context.Context, location int64, departureDate int64) (int64, error) {
	var total int64
	query := `SELECT COUNT(*) FROM tour_tbl where 1=1 `

	if location != 0 {
		query += `AND location = ? `
	}
	if departureDate != 0 {
		query += `AND departure_date = ? `
	}

	err := m.conn.QueryRowCtx(ctx, &total, query, location, departureDate)
	if err != nil {
		return 0, err
	}
	return total, nil
}
