<?php


namespace App\Tests\Api;


use ApiPlatform\Core\Bridge\Symfony\Bundle\Test\ApiTestCase;
use Symfony\Contracts\HttpClient\Exception\TransportExceptionInterface;
use Symfony\Contracts\HttpClient\ResponseInterface;

abstract class AbstractApiResourceCase extends ApiTestCase
{
    private const headers = [
        'accept' => 'application/json'
    ];
    protected string $resource_url;

    /**
     * @throws TransportExceptionInterface
     */
    protected function postOne($jsonArray, string $resUrl = null): ResponseInterface
    {
        return static::createClient()->request(
            'POST',
            $resUrl ?? $this->resource_url,
            [
                'headers' => self::headers,
                'json' => $jsonArray
            ]
        );
    }

    /**
     * @throws TransportExceptionInterface
     */
    protected function putOne(int $id, $jsonArray, string $resUrl = null): ResponseInterface
    {
        return static::createClient()->request(
            'PUT',
            ($resUrl ?? $this->resource_url) . "/$id",
            [
                'headers' => self::headers,
                'json' => $jsonArray
            ]
        );
    }

    /**
     * @throws TransportExceptionInterface
     */
    protected function getOne(int $id, string $resUrl = null): ResponseInterface
    {
        return static::createClient()->request(
            'GET',
            ($resUrl ?? $this->resource_url) . "/$id",
            [
                'headers' => self::headers
            ]
        );
    }

    /**
     * @throws TransportExceptionInterface
     */
    protected function getCollection(string $resUrl = null): ResponseInterface
    {
        return static::createClient()->request(
            'GET',
            $resUrl ?? $this->resource_url,
            [
                'headers' => self::headers
            ]
        );
    }

    /**
     * @throws TransportExceptionInterface
     */
    protected function deleteOne(int $id, ?string $resUrl = null): ResponseInterface
    {
        return static::createClient()->request(
            'DELETE',
            ($resUrl ?? $this->resource_url) . "/$id",
            [
                'headers' => self::headers
            ]
        );
    }
}