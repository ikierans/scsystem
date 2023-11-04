package tasks

import (
	"context"
	"encoding/json"
	"github.com/hibiken/asynq"
	"qrcheckin/internal/mod/model"
	"qrcheckin/internal/types"
)

func SaveActivityType(registrationId, adminId, activityType string) error {
	_history, err := model.NewHistory().Latest(registrationId)
	if err != nil {
		return err
	}
	if _history.ActivityType == activityType {
		return nil
	}
	return new(model.History).Insert(&types.History{
		RegistrationId: registrationId,
		ActivityType:   activityType,
		AdminId:        adminId,
	})
}

func HandleSaveActivityType(_ context.Context, task *asynq.Task) error {
	var history types.History
	if err := json.Unmarshal(task.Payload(), &history); err != nil {
		return err
	}
	// fmt.Println(history)
	return model.NewHistory().Insert(&history)
}
