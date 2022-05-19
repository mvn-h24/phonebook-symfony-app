<?php


namespace App\Tests\Api;


use Symfony\Contracts\HttpClient\Exception\ClientExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\DecodingExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\RedirectionExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\ServerExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\TransportExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\TransportExceptionInterface as TransportExceptionInterfaceAlias;

abstract class AbstractApiResourceTestSequence extends AbstractApiResourceCase
{
    protected array $testResourceData;
    protected array $testUpdateData;

    /**
     * @throws ClientExceptionInterface
     * @throws DecodingExceptionInterface
     * @throws RedirectionExceptionInterface
     * @throws ServerExceptionInterface
     * @throws TransportExceptionInterfaceAlias
     */
    public function testElementCreate(): int
    {
        $response = $this->postOne($this->testResourceData);
        static::assertResponseStatusCodeSame(201);
        static::assertJsonContains($this->testResourceData);
        return (int)$response->toArray()['id'];
    }


    /**
     * @depends testElementCreate
     * @param int $id
     * @return int
     * @throws ClientExceptionInterface
     * @throws DecodingExceptionInterface
     * @throws RedirectionExceptionInterface
     * @throws ServerExceptionInterface
     * @throws TransportExceptionInterfaceAlias
     */
    public function testElementGet(int $id): int
    {
        $this->getOne($id);
        static::assertResponseStatusCodeSame(200);
        static::assertJsonContains($this->testResourceData);
        return $id;
    }

    /**
     * @depends testElementGet
     * @throws ClientExceptionInterface
     * @throws DecodingExceptionInterface
     * @throws RedirectionExceptionInterface
     * @throws ServerExceptionInterface
     * @throws TransportExceptionInterfaceAlias
     */
    public function testElementUpdate(int $id): int
    {

        $this->putOne($id, $this->testUpdateData);
        static::assertResponseStatusCodeSame(200);
        static::assertJsonContains(array_merge($this->testResourceData, $this->testUpdateData));
        return $id;
    }

    /**
     * @depends testElementUpdate
     * @throws ClientExceptionInterface
     * @throws RedirectionExceptionInterface
     * @throws ServerExceptionInterface
     * @throws TransportExceptionInterfaceAlias
     */
    public function testElementDelete(int $id): void
    {
        $this->deleteOne($id);
        static::assertResponseStatusCodeSame(204);
    }

    /**
     * @depends testElementDelete
     *
     * @throws ClientExceptionInterface
     * @throws DecodingExceptionInterface
     * @throws RedirectionExceptionInterface
     * @throws ServerExceptionInterface
     * @throws TransportExceptionInterfaceAlias
     */
    public function testElementsCollection(): void
    {
        $collectionResponse = $this->getCollection();
        static::assertResponseStatusCodeSame(200);
        $countBefore = count($collectionResponse->toArray());

        $res = $this->postOne($this->testResourceData);
        static::assertResponseStatusCodeSame(201);
        $createdResource = $res->toArray();

        $collectionResponse = $this->getCollection();
        static::assertResponseStatusCodeSame(200);
        $countAfter = count($collectionResponse->toArray());

        $this->assertSame($countAfter, $countBefore + 1);

        $this->deleteOne((int)$createdResource['id']);
        static::assertResponseStatusCodeSame(204);
    }
}