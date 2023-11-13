package tasks

import (
	"context"
	"encoding/json"
	"errors"
	"github.com/hibiken/asynq"
	"qrcheckin/internal/model"
	"qrcheckin/internal/repo"
)

func SignUp(id, firstName, lastName, phoneNumber, email, password string) error {
	_user, err := repo.NewUser().GetByID(id)
	if err != nil || _user.Email == "" {
		return repo.NewUser().Insert(&model.Users{
			Id:          id,
			FirstName:   firstName,
			LastName:    lastName,
			PhoneNumber: phoneNumber,
			Email:       email,
			Password:    password,
		})
	}
	if _user.Password == "" {
		return repo.NewUser().PromoteAdmin(id, "admin", password, email, phoneNumber)
	}
	return errors.New("user already exists")
}

func SaveUser(id, firstName, lastName, phoneNumber, email string) error {
	return new(repo.Users).Insert(&model.Users{
		Id:          id,
		FirstName:   firstName,
		LastName:    lastName,
		Email:       email,
		PhoneNumber: phoneNumber,
	})
}

func HandleSaveUser(_ context.Context, task *asynq.Task) error {
	var user model.Users
	if err := json.Unmarshal(task.Payload(), &user); err != nil {
		return err
	}
	return repo.NewUser().Insert(&user)
}