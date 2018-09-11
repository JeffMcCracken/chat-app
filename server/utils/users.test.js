const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
    var users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Mike',
            room: 'Node Course'
        }, {
            id: '2',
            name: 'Jen',
            room: 'React Course'
        }, {
            id: '3',
            name: 'Julie',
            room: 'Node Course'
        }]
    });
    
    it('should add new user', () => {
        var thisUsers = new Users();
        var user = {
            id: '1',
            name: 'Jeff',
            room: 'My room'
        }

        var resUser = thisUsers.addUser(user.id, user.name, user.room);

        expect(thisUsers.users).toEqual([user]);
    });

    it('should remove a user', () => {
        var removedUser = users.removeUser('1');

        expect(users.users.length).toBe(2);
        expect(removedUser).toEqual({
            id: '1',
            name: 'Mike',
            room: 'Node Course'
        });
    });

    it('should not remove user', () => {
        var originalUsers = users;
        var removedUser = users.removeUser(5);

        expect(users).toEqual(originalUsers);
        expect(removedUser).toBe(undefined);
    });

    it('should find user', () => {
        var foundUser = users.getUser('1');
        expect(foundUser.id).toBe('1');
    });

    it('should not find user', () => {
        var foundUser = users.getUser('5');
        expect(foundUser).toBe(undefined);
    });

    it('should return names for node course', () => {
        var userList = users.getUserList('Node Course');

        expect(userList).toEqual(['Mike', 'Julie']);
    });

    it('should return names for react course', () => {
        var userList = users.getUserList('React Course');

        expect(userList).toEqual(['Jen']);
    });
});