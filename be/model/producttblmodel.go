package model

import "github.com/zeromicro/go-zero/core/stores/sqlx"

var _ ProductTblModel = (*customProductTblModel)(nil)

type (
	// ProductTblModel is an interface to be customized, add more methods here,
	// and implement the added methods in customProductTblModel.
	ProductTblModel interface {
		productTblModel
	}

	customProductTblModel struct {
		*defaultProductTblModel
	}
)

// NewProductTblModel returns a model for the database table.
func NewProductTblModel(conn sqlx.SqlConn) ProductTblModel {
	return &customProductTblModel{
		defaultProductTblModel: newProductTblModel(conn),
	}
}
