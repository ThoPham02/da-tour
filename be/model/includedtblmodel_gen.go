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
	includedTblFieldNames          = builder.RawFieldNames(&IncludedTbl{})
	includedTblRows                = strings.Join(includedTblFieldNames, ",")
	includedTblRowsExpectAutoSet   = strings.Join(stringx.Remove(includedTblFieldNames), ",")
	includedTblRowsWithPlaceHolder = strings.Join(stringx.Remove(includedTblFieldNames, "`id`"), "=?,") + "=?"
)

type (
	includedTblModel interface {
		Insert(ctx context.Context, data *IncludedTbl) (sql.Result, error)
		FindOne(ctx context.Context, id int64) (*IncludedTbl, error)
		Update(ctx context.Context, data *IncludedTbl) error
		Delete(ctx context.Context, id int64) error
	}

	defaultIncludedTblModel struct {
		conn  sqlx.SqlConn
		table string
	}

	IncludedTbl struct {
		Id          int64          `db:"id"`
		Name        string         `db:"name"`
		Description sql.NullString `db:"description"`
		Icon        sql.NullInt64  `db:"icon"`
		TemplateId  sql.NullInt64  `db:"template_id"`
		CreatedAt   sql.NullInt64  `db:"created_at"`
		UpdatedAt   sql.NullInt64  `db:"updated_at"`
	}
)

func newIncludedTblModel(conn sqlx.SqlConn) *defaultIncludedTblModel {
	return &defaultIncludedTblModel{
		conn:  conn,
		table: "`included_tbl`",
	}
}

func (m *defaultIncludedTblModel) withSession(session sqlx.Session) *defaultIncludedTblModel {
	return &defaultIncludedTblModel{
		conn:  sqlx.NewSqlConnFromSession(session),
		table: "`included_tbl`",
	}
}

func (m *defaultIncludedTblModel) Delete(ctx context.Context, id int64) error {
	query := fmt.Sprintf("delete from %s where `id` = ?", m.table)
	_, err := m.conn.ExecCtx(ctx, query, id)
	return err
}

func (m *defaultIncludedTblModel) FindOne(ctx context.Context, id int64) (*IncludedTbl, error) {
	query := fmt.Sprintf("select %s from %s where `id` = ? limit 1", includedTblRows, m.table)
	var resp IncludedTbl
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

func (m *defaultIncludedTblModel) Insert(ctx context.Context, data *IncludedTbl) (sql.Result, error) {
	query := fmt.Sprintf("insert into %s (%s) values (?, ?, ?, ?, ?, ?, ?)", m.table, includedTblRowsExpectAutoSet)
	ret, err := m.conn.ExecCtx(ctx, query, data.Id, data.Name, data.Description, data.Icon, data.TemplateId, data.CreatedAt, data.UpdatedAt)
	return ret, err
}

func (m *defaultIncludedTblModel) Update(ctx context.Context, data *IncludedTbl) error {
	query := fmt.Sprintf("update %s set %s where `id` = ?", m.table, includedTblRowsWithPlaceHolder)
	_, err := m.conn.ExecCtx(ctx, query, data.Name, data.Description, data.Icon, data.TemplateId, data.CreatedAt, data.UpdatedAt, data.Id)
	return err
}

func (m *defaultIncludedTblModel) tableName() string {
	return m.table
}
