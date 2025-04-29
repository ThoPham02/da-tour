package model

import "github.com/zeromicro/go-zero/core/stores/sqlx"

var _ TourTblModel = (*customTourTblModel)(nil)

type (
	// TourTblModel is an interface to be customized, add more methods here,
	// and implement the added methods in customTourTblModel.
	TourTblModel interface {
		tourTblModel
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
