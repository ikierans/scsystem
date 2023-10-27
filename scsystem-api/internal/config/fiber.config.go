package config

import (
	"strconv"
	"time"

	"github.com/gofiber/fiber/v2"
)

// FiberConfig func for configuration Fiber module.
// See: https://docs.gofiber.io/api/fiber#config
func FiberConfig() fiber.Config {
	// Define server settings.
	readTimeoutSecondsCount, _ := strconv.Atoi(ServerReadTimeout)
	// Return Fiber configuration.
	return fiber.Config{
		ReadTimeout: time.Second * time.Duration(readTimeoutSecondsCount),
	}
}
