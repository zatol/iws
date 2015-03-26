<?php return array (
  'logs' =>
  array (
    'path' => 'logs/log',
    'type' => 'file',
  ),
  'DB' =>
  array (
    'type' => 'mysql',
    'tablePre' => 'iwebshop_',
    'read' =>
    array (
      0 =>
      array (
        'host' => '192.168.1.51:3306',
        'user' => 'root',
        'passwd' => 'root',
        'name' => '002',
      ),
    ),
    'write' =>
    array (
      'host' => '192.168.1.51:3306',
      'user' => 'root',
      'passwd' => 'root',
      'name' => '002',
    ),
  ),
  'langPath' => 'language',
  'viewPath' => 'views',
  'classes' => 'classes.*',
  'rewriteRule' => 'url',
  'theme' => 'default',
  'skin' => 'default',
  'timezone' => 'Etc/GMT-8',
  'upload' => 'upload',
  'dbbackup' => 'backup/database',
  'safe' => 'cookie',
  'lang' => 'zh_sc',
  'debug' => false,
  'configExt' =>
  array (
    'site_config' => 'config/site_config.php',
  ),
  'encryptKey' => '864291',
)?>