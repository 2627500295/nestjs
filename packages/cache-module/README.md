# 缓存模块

## 注册缓存模块

```typescript
const SECONDS_IN_HOUR = 3_600;

@Module({
  imports: [
    CacheModule.forRoot({
      ttl: SECONDS_IN_HOUR
    }),
  ]
})
export class AppModule {}
```

## 使用缓存服务

```typescript
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  public constructor(private readonly cacheService: CacheService) {}

  public async validate(token: string): Promise<User> {
    const cacheUser = await this.cacheService.get("token");
    if (cacheUser) return cacheUser;
    const user = await this.userService.getUser();
    if (!user) {
      throw new UnauthorizedException('用户 `token` 无效, 请尝试重新登录');
    }
    await this.cacheService.set(token, user);
    return user;
  }
}
```
