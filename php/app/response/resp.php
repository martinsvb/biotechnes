<?php

namespace app\response;

/**
 * Application response
 *
 * @property $_statusCodes, Allowed response http codes list
 */
class resp
{
    private $_statusCodes = [
        200 => 'OK',
        201 => 'Created',
        202 => 'Accepted',
        203 => 'Non-Authorative Information',
        204 => 'No Content',
        301 => 'Moved Permanently',
        302 => 'Moved Temporarily',
        400 => 'Bad Request',
        401 => 'Authorization Required',
        403 => 'Forbidden',
        404 => 'Not Found',
        405 => 'Method Not Allowed',
        406 => 'Not Acceptable',
        407 => 'Proxy Authentication Required',
        408 => 'Request Timed Out',
        409 => 'Conflicting Request',
        500 => 'Internal Server Error'
    ];

    /**
     *  Send response
     *
     *  @param int $code
     *  @param array $data
     *
     *  send json http response
     */
    public function send($code, $data = [])
    {
        if (in_array($code, array_keys($this->_statusCodes))) {
            http_response_code($code);
            header('Content-Type: application/json');
            echo json_encode(['data' => $data]);
        }
        
        exit;
    }
}
