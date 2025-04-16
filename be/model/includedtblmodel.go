package model

import "github.com/zeromicro/go-zero/core/stores/sqlx"

var _ IncludedTblModel = (*customIncludedTblModel)(nil)

type (
	// IncludedTblModel is an interface to be customized, add more methods here,
	// and implement the added methods in customIncludedTblModel.
	IncludedTblModel interface {
		includedTblModel
	}

	customIncludedTblModel struct {
		*defaultIncludedTblModel
	}
)

// NewIncludedTblModel returns a model for the database table.
func NewIncludedTblModel(conn sqlx.SqlConn) IncludedTblModel {
	return &customIncludedTblModel{
		defaultIncludedTblModel: newIncludedTblModel(conn),
	}
}
