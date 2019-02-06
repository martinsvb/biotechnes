<?php

namespace app\exception;

use Exception;

/**
 * Custom autoload exception
 *
 * @property _type, Type of exception
 */
class excepAutoLoad extends Exception
{
    private
    $_type = "Autoload";
    
    public function __construct($message, $code = 0, Exception $previous = null)
    {
        parent::__construct($message, $code, $previous);
    }
    
    public function getType()
    {
        return $this->_type;
    }
}
