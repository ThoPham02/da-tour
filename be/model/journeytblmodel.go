package model

import "github.com/zeromicro/go-zero/core/stores/sqlx"

var _ JourneyTblModel = (*customJourneyTblModel)(nil)

type (
	// JourneyTblModel is an interface to be customized, add more methods here,
	// and implement the added methods in customJourneyTblModel.
	JourneyTblModel interface {
		journeyTblModel
	}

	customJourneyTblModel struct {
		*defaultJourneyTblModel
	}
)

// NewJourneyTblModel returns a model for the database table.
func NewJourneyTblModel(conn sqlx.SqlConn) JourneyTblModel {
	return &customJourneyTblModel{
		defaultJourneyTblModel: newJourneyTblModel(conn),
	}
}
