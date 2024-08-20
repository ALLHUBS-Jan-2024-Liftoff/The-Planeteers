package com.planeteers.planeteers_api.service;

import com.planeteers.planeteers_api.dto.PointDTO;
import com.planeteers.planeteers_api.models.GamePoint;
import com.planeteers.planeteers_api.models.PlayerPoint;
import com.planeteers.planeteers_api.models.User;
import org.springframework.stereotype.Service;

public interface PointService {

   GamePoint saveGamePoint(GamePoint gamePoint);

   PlayerPoint savePlayerPoint(PointDTO pointDTO, String token);

}
