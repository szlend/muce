class HerokuForceHttps
  def initialize(app)
    @app = app
  end

  def call(env)
    env['HTTP_X_FORWARDED_PROTO'] = 'https' if env['HTTP_X_FORWARDED_PROTO']
    @app.call(env)
  end
end
