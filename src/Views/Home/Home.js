// @flow
import React, {Component} from 'react';
import {Avatar, Card, CardHeader, CardMedia, CardTitle} from "material-ui";
import ScheduleItem from '../Schedule/ScheduleItem';
import {PropTypes} from 'prop-types';
import moment from "moment";

export default class Home extends Component {
    static propTypes = {
        schedule: PropTypes.object.isRequired
    };

    render() {
        const nextRecords = this.props.schedule.findNext(new Date(), 5);
        const next = nextRecords.splice(0, 1)[0];
        const photo = next.photo || "https://raw.githubusercontent.com/allegro/atm-event-app/master/public/img/back.png";
        const avatar = <span>{next.speakers.map((speaker, i) => <Avatar key={`${speaker.name}-${i}`} className="speaker-avatar" src={speaker.photo}/>)}</span>;
        return (
            <div>
                <Card>
                    <CardMedia overlay={<CardTitle title={next.title}/>}>
                        <img src={photo} alt="background"/>
                    </CardMedia>
                    <CardHeader titleColor='#D50E50' title={next.speakers ? next.speakers.map(speaker => speaker.name).join(', ') : ""} subtitle={moment(next.date + ' ' + next.start, "YYYY-MM-DD HH:mm").fromNow()}
                                avatar={next.speakers ? avatar : null}/>
                </Card>
                <h2>Kolejne wystąpienia:</h2>
                {nextRecords.map(item => <ScheduleItem key={item.id} item={item} hideDescription={true}/>)}
            </div>
        )
    }
}
