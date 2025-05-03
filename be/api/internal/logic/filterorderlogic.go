package logic

import (
	"context"

	"da-tour/api/internal/svc"
	"da-tour/api/internal/types"
	"da-tour/common"
	"da-tour/model"

	"github.com/zeromicro/go-zero/core/logx"
)

type FilterOrderLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewFilterOrderLogic(ctx context.Context, svcCtx *svc.ServiceContext) *FilterOrderLogic {
	return &FilterOrderLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *FilterOrderLogic) FilterOrder(req *types.FilterOrderReq) (resp *types.FilterOrderRes, err error) {
	l.Logger.Info("FilterOrder ", req)

	var total int64
	var ordersModel []*model.OrderTbl

	total, err = l.svcCtx.OrderTblModel.CountFilter(l.ctx, req.UserID, req.Status, req.TourID)
	if err != nil {
		l.Logger.Error(err)
		return &types.FilterOrderRes{
			Result: types.Result{
				Code:    common.DB_ERR_CODE,
				Message: common.DB_ERR_MESS,
			},
		}, nil
	}

	ordersModel, err = l.svcCtx.OrderTblModel.FilterOrder(l.ctx, req.UserID, req.Status, req.TourID, req.Limit, req.Offset)
	if err != nil {
		l.Logger.Error(err)
		return &types.FilterOrderRes{
			Result: types.Result{
				Code:    common.DB_ERR_CODE,
				Message: common.DB_ERR_MESS,
			},
		}, nil
	}
	for _, order := range ordersModel {
		tourModel, err := l.svcCtx.TourTblModel.FindOne(l.ctx, order.TourId)
		if err != nil {
			l.Logger.Error(err)
			return &types.FilterOrderRes{
				Result: types.Result{
					Code:    common.DB_ERR_CODE,
					Message: common.DB_ERR_MESS,
				},
			}, nil
		}

		resp.Orders = append(resp.Orders, types.Order{
			ID:            order.Id,
			Code:          order.Code,
			TourID:        order.TourId,
			TourName:      tourModel.Name,
			UserID:        order.UserId.Int64,
			FullName:      order.UserName,
			Email:         order.Email,
			Phone:         order.Phone,
			Quantity:      order.Quantity,
			TotalPrice:    order.Total,
			Status:        order.Status,
			PaymentStatus: order.PaymentStatus,
			CreateDate:    order.CreatedAt.Int64,
		})
	}

	l.Logger.Info("FilterOrder Success")
	return &types.FilterOrderRes{
		Result: types.Result{
			Code:    common.SUCCESS_CODE,
			Message: common.SUCCESS_MESS,
		},
		Orders: resp.Orders,
		Total:  total,
	}, nil
}
