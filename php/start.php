<?php

/**
 *  Application start
 */
class start
{
    /**
     *  Set error reporting
     *  Set internal encoding
     *  Run Autoloading
     */
    public function __construct()
    {
        if (!ini_get('display_errors')) {
            ini_set('display_errors', 1);
        }
        
        mb_internal_encoding('UTF-8');
        
        $this->_runAutoloading();
    }
    
    /**
     *  Register autoload function
     */
    private function _runAutoloading()
    {
        /**
         *  Autoload process
         */
        function autoload($class)
        {
            $class = str_replace("\\", "/", $class);
            
            if (!file_exists("$class.php")) {
                $class = preg_replace('#Firebase\/JWT#', 'jwt/src', $class);
            }
            
            if (!include_once("$class.php")) {
                throw new app\exception\excepAutoLoad("Class loaded error: $class");
            }
        }
        
        spl_autoload_register("autoload");
    }
}

function printArr($arr)
{
    echo "<pre>";
    print_r ($arr);
    echo "</pre>";
}

/**
 *  Enable CORS requests
 */
function enableCors()
{
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Credentials: true');
    header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
    header("Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS, DELETE");
}
